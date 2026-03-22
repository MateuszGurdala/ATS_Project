using ATSAPI.APIMaps;
using ATSAPI.Databaase;

var builder = WebApplication.CreateBuilder(args);
string allowedOrigins;

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => { options.AddPolicy(name: nameof(allowedOrigins), policy => { policy.WithOrigins("http://localhost:4200"); }); });

builder.Services.AddScoped<IAppDbContext, AppDbContext>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(nameof(allowedOrigins));

app.AddGetAvailableYears();
app.AddGetPictures();
app.AddGetAreas();

app.AddPostRegisterUserAccount();

app.Run();
