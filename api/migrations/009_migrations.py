steps = [
    [
        """
        INSERT INTO questions
        (prompt)
        VALUES
        ('Do you feel safe today?'),
        ('Do you feel rested?'),
        ('Do you feel loved by others?'),
        ('Do you feel inspired?'),
        ('Do you feel active?');
        """,
        """
        DROP TABLE questions;
        """,
    ]
]
