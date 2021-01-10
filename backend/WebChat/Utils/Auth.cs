using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using WebChat.Models;


namespace WebChat.Utils
{
	[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
	public class Auth : Attribute, IAuthorizationFilter
	{
	    public void OnAuthorization(AuthorizationFilterContext context)
	    {
	        var user = (User)context.HttpContext.Items["User"];
	        if (user == null)
	        {
	            // not logged in
	            context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
	        }
	    }
	}
}