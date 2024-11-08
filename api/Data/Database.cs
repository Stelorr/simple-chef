using MongoDB.Driver;
using MongoDB.Bson;
using api.Models;

namespace api.Data
{
    public class Database
    {
        public Database()
        {

            const string connectionUri = "mongodb+srv://benjaminreeves98:<db_password>@cluster0.tn8qq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

            var settings = MongoClientSettings.FromConnectionString(connectionUri);

            // Set the ServerApi field of the settings object to set the version of the Stable API on the client
            settings.ServerApi = new ServerApi(ServerApiVersion.V1);

            // Create a new client and connect to the server
            var client = new MongoClient(settings);
            // var database = client.GetDatabase("SimpleChef");

            
            // Send a ping to confirm a successful connection
            try
            {
                var result = client.GetDatabase("admin").RunCommand<BsonDocument>(new BsonDocument("ping", 1));
                Console.WriteLine("Pinged your deployment. You successfully connected to MongoDB!");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }

        }

    }
}