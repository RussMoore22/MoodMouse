steps = [
    [
        # Create the accounts table
        """
        CREATE TABLE accounts (
        id SERIAL PRIMARY KEY NOT NULL,
        first_name CHAR(50) NOT NULL,
        last_name CHAR(50) NOT NULL,
        user_name CHAR(50) NOT NULL,
        email CHAR(50) NOT NULL,
        password CHAR(20) NOT NULL
        )
        """,
        # Drop the table
        """
        DROP TABLE accounts;
        """
    ]
]
