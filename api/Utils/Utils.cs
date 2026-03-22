using System.Security.Cryptography;
using System.Text;

namespace ATSAPI;

public static class Utils
{
	public static string GetSHA512(string inputString) => Encoding.ASCII.GetString(SHA512.HashData(Encoding.UTF8.GetBytes(inputString)));
}
