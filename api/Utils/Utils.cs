using System.Security.Cryptography;
using System.Text;

namespace ATSAPI.Utils;

public static class Utils
{
	public static string GetSHA512(string inputString) => Convert.ToBase64String(SHA512.HashData(Encoding.UTF8.GetBytes(inputString)));
}
