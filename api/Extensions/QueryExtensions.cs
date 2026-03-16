using System.Linq.Expressions;

namespace ATSAPI.Extensions;

public static class QueryExtensions
{
	public static IQueryable<T> WhereIf<T>(this IQueryable<T> query, Expression<Func<T, bool>> predicate, bool condition) => condition ? query.Where(predicate) : query;
}
