using ATSAPI.APIMaps;
using ATSAPI.Database;

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

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.AddGetAvailableYears();
app.AddGetPictures();
app.AddGetAreas();

app.AddPostRegisterUserAccount();
app.AddPostLogin();

app.UseHttpsRedirection();
app.UseCors(nameof(allowedOrigins));
app.UseAuthentication();
app.UseAuthorization();

app.Run();
