using ATSAPI.Models;

var builder = WebApplication.CreateBuilder(args);
var myAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => { options.AddPolicy(name: myAllowSpecificOrigins, policy => { policy.WithOrigins("http://localhost:4200"); }); });

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(myAllowSpecificOrigins);

app.MapGet("/api/available-years", () => (List<int>) [2016, 2017, 2018, 2019, 2020, 2023, 2024, 2025])
	.WithName("GetAvailableYears")
	.WithOpenApi();

app.MapGet("/api/areas", () => new Dictionary<int, List<TreeNode>>
	{
		{ 2016, [
			new TreeNode() { Name = "Kabaty", Children = [new TreeNode() { Name = "Dembego" }] },
			new TreeNode() { Name = "Natolin", Children = [new TreeNode() { Name = "Belgradzka" }] }
		] }
	})
	.WithName("GetAreas")
	.WithOpenApi();

app.Run();
