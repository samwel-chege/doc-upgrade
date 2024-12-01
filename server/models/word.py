from . import db

class Word(db.Model):
    __tablename__ = 'words'  # Specify the table name for the Word model
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<Word {self.word}>"
