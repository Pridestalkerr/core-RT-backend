using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;



namespace WebChat.Models
{
    public class Message
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string From { get; set; }

        public string Date { get; set; }

        public string Content { get; set; }
    }
}