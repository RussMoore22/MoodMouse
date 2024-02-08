steps = [
    [
        """
ALTER TABLE rorschach_tests
ADD COLUMN response VARCHAR(500);

""",
        """
DROP TABLE rorschach_tests;
""",
    ]
]
