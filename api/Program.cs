using ATSAPI.APIMaps;
using ATSAPI.Database;
using ATSAPI.Services;

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
builder.Services.AddSingleton<IAzureStorageService, AzureStorageService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.AddGetAvailableYears();
app.AddGetPictures();
app.AddGetAreas();
app.AddGetUploadOptions();
app.AddGetPictureDetails();

app.AddPostRegisterUserAccount();
app.AddPostLogin();
app.AddPostUploadPhoto();

app.UseHttpsRedirection();
app.UseCors(nameof(allowedOrigins));
app.UseAuthentication();
app.UseAuthorization();

app.Run();
