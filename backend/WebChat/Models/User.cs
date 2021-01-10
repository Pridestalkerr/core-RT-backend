using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;



namespace WebChat.Models
{
    public class User
    {
    	[BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [MongoUniqueStringIndex]
        public string Email { get; set; }

        [MongoUniqueStringIndex]
        public string Username { get; set; }

        // [BsonIgnore]
        public string Password { get; set; }
    }
}