steps = [
    [
        # Create the rorschach_tests table
        """
        CREATE TABLE rorschach_tests (
        rorschach_id SERIAL PRIMARY KEY NOT NULL,
        image INT NOT NULL,
        FOREIGN KEY (image) REFERENCES rorschach_imgs(id)
        );
        """,
        # Drop the table
        """
        DROP TABLE rorschach_tests;
        """,
    ]
]
