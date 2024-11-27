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

        public async Task<List<User>> GetUsersAsync() =>
            await myDatabase._users.Find(user => true).ToListAsync();

        public async Task<User?> GetUserByCredentialsAsync(string email, string password)
        {
            var filter = Builders<User>.Filter.And(
                Builders<User>.Filter.Eq(u => u.EmailAddress, email),
                Builders<User>.Filter.Eq(u => u.Password, password));

            return await myDatabase._users.Find(filter).FirstOrDefaultAsync();
        }

        public async Task CreateUserAsync(User newUser) =>
            await myDatabase._users.InsertOneAsync(newUser);
    }
}