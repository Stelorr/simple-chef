using api.Models;

namespace api.Data
{
    public class UserDataHandler : IUserDataHandler
    {
        public User GetUser(string Username, string Password) {
            User myUser = new User();

            return myUser;
        }
    }
}