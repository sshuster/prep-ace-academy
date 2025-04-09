
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
import json
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database setup
DB_PATH = 'prepace.db'

def init_db():
    """Initialize the SQLite database with tables if they don't exist."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user'
    )
    ''')
    
    # Create courses table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL,
        level TEXT NOT NULL,
        duration INTEGER NOT NULL,
        videos INTEGER NOT NULL,
        quizzes INTEGER NOT NULL,
        image_src TEXT
    )
    ''')
    
    # Create user_courses table for tracking enrollment and progress
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS user_courses (
        user_id INTEGER,
        course_id INTEGER,
        progress INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (course_id) REFERENCES courses (id),
        PRIMARY KEY (user_id, course_id)
    )
    ''')
    
    # Create videos table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        course_id INTEGER,
        duration TEXT NOT NULL,
        thumbnail TEXT,
        FOREIGN KEY (course_id) REFERENCES courses (id)
    )
    ''')
    
    # Create user_videos table for tracking watched videos
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS user_videos (
        user_id INTEGER,
        video_id INTEGER,
        watched BOOLEAN DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (video_id) REFERENCES videos (id),
        PRIMARY KEY (user_id, video_id)
    )
    ''')

    # Add mock users if they don't exist yet
    cursor.execute("SELECT * FROM users WHERE username = 'muser'")
    if not cursor.fetchone():
        cursor.execute(
            "INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)",
            ('muser', generate_password_hash('muser'), 'Mock User', 'user')
        )
    
    cursor.execute("SELECT * FROM users WHERE username = 'mvc'")
    if not cursor.fetchone():
        cursor.execute(
            "INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)",
            ('mvc', generate_password_hash('mvc'), 'Mock Admin', 'admin')
        )

    # Insert some sample courses if none exist
    cursor.execute("SELECT COUNT(*) FROM courses")
    if cursor.fetchone()[0] == 0:
        # Load mock data from the provided JSON structure
        courses = [
            {
                "title": "SAT Math Fundamentals",
                "description": "Master the core math concepts tested on the SAT, including algebra, problem-solving, and data analysis.",
                "type": "SAT",
                "level": "Beginner",
                "duration": 18,
                "videos": 24,
                "quizzes": 12,
                "image_src": "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2148&q=80"
            },
            {
                "title": "ACT Science Strategies",
                "description": "Learn effective strategies for the ACT Science section, focusing on data interpretation and scientific analysis.",
                "type": "ACT",
                "level": "Intermediate",
                "duration": 12,
                "videos": 18,
                "quizzes": 9,
                "image_src": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2030&q=80"
            },
            {
                "title": "AP Calculus Crash Course",
                "description": "Intensive review of AP Calculus AB concepts, with practice problems and exam strategies.",
                "type": "AP",
                "level": "Advanced",
                "duration": 24,
                "videos": 32,
                "quizzes": 16,
                "image_src": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            }
        ]
        
        for course in courses:
            cursor.execute(
                "INSERT INTO courses (title, description, type, level, duration, videos, quizzes, image_src) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                (course["title"], course["description"], course["type"], course["level"], 
                 course["duration"], course["videos"], course["quizzes"], course["image_src"])
            )
    
    conn.commit()
    conn.close()

# Initialize database
init_db()

# Routes
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    user = cursor.fetchone()
    
    if user and check_password_hash(user['password'], password):
        # Return user info without password
        user_dict = dict(user)
        del user_dict['password']
        return jsonify({"success": True, "user": user_dict})
    else:
        return jsonify({"success": False, "message": "Invalid username or password"}), 401

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    name = data.get('name')
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Check if username already exists
    cursor.execute("SELECT username FROM users WHERE username = ?", (username,))
    if cursor.fetchone():
        conn.close()
        return jsonify({"success": False, "message": "Username already exists"}), 400
    
    # Insert new user
    hashed_password = generate_password_hash(password)
    cursor.execute(
        "INSERT INTO users (username, password, name, role) VALUES (?, ?, ?, ?)",
        (username, hashed_password, name, 'user')
    )
    
    user_id = cursor.lastrowid
    
    conn.commit()
    conn.close()
    
    return jsonify({
        "success": True, 
        "user": {
            "id": user_id,
            "username": username,
            "name": name,
            "role": "user"
        }
    })

@app.route('/api/users', methods=['GET'])
def get_users():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT id, username, name, role FROM users")
    users = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return jsonify({"success": True, "users": users})

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Check if the user exists
    cursor.execute("SELECT id FROM users WHERE id = ?", (user_id,))
    if not cursor.fetchone():
        conn.close()
        return jsonify({"success": False, "message": "User not found"}), 404
    
    # Delete user
    cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
    conn.commit()
    conn.close()
    
    return jsonify({"success": True, "message": "User deleted successfully"})

@app.route('/api/courses', methods=['GET'])
def get_courses():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM courses")
    courses = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return jsonify({"success": True, "courses": courses})

@app.route('/api/courses/<int:course_id>', methods=['GET'])
def get_course(course_id):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM courses WHERE id = ?", (course_id,))
    course = cursor.fetchone()
    
    if not course:
        conn.close()
        return jsonify({"success": False, "message": "Course not found"}), 404
    
    # Get videos for this course
    cursor.execute("SELECT * FROM videos WHERE course_id = ?", (course_id,))
    videos = [dict(row) for row in cursor.fetchall()]
    
    course_dict = dict(course)
    course_dict['videos'] = videos
    
    conn.close()
    
    return jsonify({"success": True, "course": course_dict})

@app.route('/api/user_courses/<int:user_id>', methods=['GET'])
def get_user_courses(user_id):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("""
        SELECT c.*, uc.progress
        FROM courses c
        JOIN user_courses uc ON c.id = uc.course_id
        WHERE uc.user_id = ?
    """, (user_id,))
    
    courses = [dict(row) for row in cursor.fetchall()]
    
    conn.close()
    
    return jsonify({"success": True, "courses": courses})

@app.route('/api/user_courses', methods=['POST'])
def enroll_in_course():
    data = request.json
    user_id = data.get('user_id')
    course_id = data.get('course_id')
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Check if already enrolled
    cursor.execute("SELECT * FROM user_courses WHERE user_id = ? AND course_id = ?", 
                  (user_id, course_id))
    if cursor.fetchone():
        conn.close()
        return jsonify({"success": False, "message": "Already enrolled in this course"}), 400
    
    # Enroll in course
    cursor.execute("INSERT INTO user_courses (user_id, course_id, progress) VALUES (?, ?, ?)",
                  (user_id, course_id, 0))
    
    conn.commit()
    conn.close()
    
    return jsonify({"success": True, "message": "Enrolled successfully"})

@app.route('/api/user_videos/<int:user_id>/<int:video_id>', methods=['POST'])
def mark_video_watched(user_id, video_id):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Check if record exists
    cursor.execute("SELECT * FROM user_videos WHERE user_id = ? AND video_id = ?", 
                  (user_id, video_id))
    if cursor.fetchone():
        # Update existing record
        cursor.execute("UPDATE user_videos SET watched = 1 WHERE user_id = ? AND video_id = ?",
                      (user_id, video_id))
    else:
        # Create new record
        cursor.execute("INSERT INTO user_videos (user_id, video_id, watched) VALUES (?, ?, ?)",
                      (user_id, video_id, 1))
    
    conn.commit()
    
    # Update course progress
    # Get the course_id for this video
    cursor.execute("SELECT course_id FROM videos WHERE id = ?", (video_id,))
    course_id = cursor.fetchone()[0]
    
    # Count total videos in course
    cursor.execute("SELECT COUNT(*) FROM videos WHERE course_id = ?", (course_id,))
    total_videos = cursor.fetchone()[0]
    
    # Count watched videos in course
    cursor.execute("""
        SELECT COUNT(*) 
        FROM user_videos uv
        JOIN videos v ON uv.video_id = v.id
        WHERE uv.user_id = ? AND v.course_id = ? AND uv.watched = 1
    """, (user_id, course_id))
    watched_videos = cursor.fetchone()[0]
    
    # Calculate progress percentage
    progress = round((watched_videos / total_videos) * 100) if total_videos > 0 else 0
    
    # Update progress in user_courses
    cursor.execute("""
        UPDATE user_courses 
        SET progress = ? 
        WHERE user_id = ? AND course_id = ?
    """, (progress, user_id, course_id))
    
    conn.commit()
    conn.close()
    
    return jsonify({"success": True, "progress": progress})

@app.route('/')
def health_check():
    return jsonify({"status": "API is running"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
