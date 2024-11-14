using api.Models;

namespace api
{
    public interface IUserDataHandler
    {
        public Task<List<User>> GetUsersAsync();
        public Task<User?> GetUserByCredentialsAsync(string username, string password);
        public Task CreateUserAsync(User newUser);
    }
}