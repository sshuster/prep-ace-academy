
# PrepAce Academy Backend

This is the Flask backend for the PrepAce Academy test preparation platform.

## Setup Instructions

1. Make sure you have Python 3.6+ installed
2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Run the application:
   ```
   python app.py
   ```

The server will start on http://localhost:5000

## API Endpoints

### Authentication
- POST `/api/login` - Login user
- POST `/api/register` - Register new user

### Users
- GET `/api/users` - Get all users (admin only)
- DELETE `/api/users/<user_id>` - Delete a user (admin only)

### Courses
- GET `/api/courses` - Get all courses
- GET `/api/courses/<course_id>` - Get course details with videos

### User Progress
- GET `/api/user_courses/<user_id>` - Get courses a user is enrolled in
- POST `/api/user_courses` - Enroll user in a course
- POST `/api/user_videos/<user_id>/<video_id>` - Mark a video as watched

## Database

The application uses SQLite for data storage. The database file (`prepace.db`) will be created automatically when you run the application for the first time.

### Mock Users

Two mock users are created automatically:
- Username: `muser`, Password: `muser` (regular user)
- Username: `mvc`, Password: `mvc` (admin user)
