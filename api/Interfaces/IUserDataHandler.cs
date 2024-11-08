using api.Models;

namespace api
{
    public interface IUserDataHandler
    {
        public User GetUser(string Username, string Password);
    }
}