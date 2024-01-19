steps = [
    [
        # Create the rorschach_imgs table
        """
        CREATE TABLE rorschach_imgs (
        id SERIAL PRIMARY KEY NOT NULL,
        path VARCHAR(300) NOT NULL
        );
        """,
        # Drop the table
        """
        DROP TABLE rorschach_imgs;
        """
    ]
]
