from . import db

class StopWord(db.Model):
    __tablename__ = 'stop_words'  # Specify the table name for the StopWord model
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f"<StopWord {self.word}>"
