using api.Models;
using MongoDB.Driver;

namespace api.Data
{
    public class UserDataHandler : IUserDataHandler
    {
        private Database myDatabase {get; set;}
        public UserDataHandler()
        {
            myDatabase = new Database();
        }
        public User GetUser(string Username, string Password)
        {
            User myUser = new User();


                
            return myUser;
        }

        public async Task<List<User>> GetUsersAsync() =>
            await myDatabase._users.Find(_ => true).ToListAsync();

        public async Task<User?> GetUserByCredentialsAsync(string username, string password)
        {
            var filter = Builders<User>.Filter.And(
                Builders<User>.Filter.Eq(u => u.Username, username),
                Builders<User>.Filter.Eq(u => u.Password, password));

            return await myDatabase._users.Find(filter).FirstOrDefaultAsync();
        }

        public async Task CreateUserAsync(User newUser)
        {
            await myDatabase._users.InsertOneAsync(newUser);
        }
    }
}