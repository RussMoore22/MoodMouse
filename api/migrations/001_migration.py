steps = [
    [
        # Create the accounts table
        """
        CREATE TABLE accounts (
        id SERIAL PRIMARY KEY NOT NULL,
        first_name CHAR(50) NOT NULL,
        last_name CHAR(50) NOT NULL,
        username CHAR(50) NOT NULL UNIQUE,
        email CHAR(50) NOT NULL UNIQUE,
        hashed_password VARCHAR(300) NOT NULL
        )
        """,
        # Drop the table
        """
        DROP TABLE accounts;
        """,
    ]
]
