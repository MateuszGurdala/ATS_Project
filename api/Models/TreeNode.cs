namespace ATSAPI.Models;

public record TreeNode()
{
	public string Name { get; set; }
	public List<TreeNode>? Children { get; set; }
};
