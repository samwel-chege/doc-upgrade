from . import db
# from sqlalchemy_serializer import SerializerMixin

class Suggestion(db.Model):
    __tablename__ = 'suggestions'

    id = db.Column(db.Integer, primary_key=True)
    document_id = db.Column(db.Integer, db.ForeignKey('documents.id'), nullable=False)
    suggestion_text = db.Column(db.Text, nullable=False)
    original_word = db.Column(db.String, nullable=True)  # Add this column
    suggested_word = db.Column(db.String, nullable=True)  # Add this column
    suggestion_type = db.Column(db.String, nullable=True)
    is_accepted = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'document_id': self.document_id,
            'suggestion_text': self.suggestion_text,
            'is_accepted': self.is_accepted
        }

    def __repr__(self):
        return f"<Suggestion {self.id} for Document {self.document_id}>"
