using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;


namespace WebChat.Models
{
    public class Message
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonIgnore]
        public string Token { get; set; }

        public string From { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime Date { get; set; }

        public string Content { get; set; }
    }
}