using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserDataHandler dataHandler;
        public UserController()
        {
            dataHandler = new UserDataHandler();
        }
        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            List<User> users = await dataHandler.GetUsersAsync();
            return Ok(users);
        }

        [HttpGet("login")]
        public async Task<ActionResult<User>> Login(string email, string password)
        {
            var user = await dataHandler.GetUserByCredentialsAsync(email, password);

            if (user == null)
            {
                return NotFound("User not found or incorrect credentials.");
            }

            return Ok(user);
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateUser([FromBody] User newUser)
        {
            // Optional: Validate newUser fields here (e.g., check if username is unique)

            await dataHandler.CreateUserAsync(newUser);
            return CreatedAtAction(nameof(GetUsers), new { id = newUser.Id }, newUser);
        }
    }
}
