using ATSAPI.APIMaps;
using ATSAPI.Database;
using ATSAPI.Extensions;
using ATSAPI.Services;
using ATSAPI.Services.Interfaces;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);
string allowedOrigins;

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication()
	.AddJwtBearer()
	.AddJwtBearer("LocalAuthIssuer");
builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
	options.AddPolicy(name: nameof(allowedOrigins), policy =>
	{
		policy
			.WithOrigins("http://localhost:4200")
			.AllowAnyHeader();
	});
});

builder.Services.AddScoped<IAppDbContext, AppDbContext>();
builder.Services.AddScoped<IOptionsService, OptionsService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddSingleton<IAzureStorageService, AzureStorageService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.AddGetEndpoints();
app.AddPostEndpoints();

app.UseHttpsRedirection();
app.UseCors(nameof(allowedOrigins));
app.UseJWTAuth();
app.UseAuthentication();
app.UseAuthorization();

app.Run();
