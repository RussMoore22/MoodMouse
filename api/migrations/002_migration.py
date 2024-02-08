steps = [
    [
        # Create the questions table
        """
        CREATE TABLE questions (
        id SERIAL PRIMARY KEY NOT NULL,
        prompt VARCHAR(300) NOT NULL UNIQUE
        );
        """,
        # Drop the table
        """
        DROP TABLE questions;
        """,
    ]
]
