using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("firstName")]
        public string? FirstName { get; set; }
        [BsonElement("lastName")]
        public string? LastName { get; set; }
        [BsonElement("email")]
        public string? EmailAddress { get; set; }
        [BsonElement("username")]
        public string? Username { get; set; }
        [BsonElement("password")]
        public string? Password { get; set; }
    }
}