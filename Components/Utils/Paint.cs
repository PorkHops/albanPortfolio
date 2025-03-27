using System.Text;

namespace albanPortfolio.Components.Utils;

public enum DrawingTool
{
    Pencil,
    Line,
    Rectangle,
    Circle,
    Eraser
}

public abstract class Shape
{
    public string Color { get; set; }
    public int StrokeWidth { get; set; }

    protected Shape(string color, int strokeWidth)
    {
        Color = color;
        StrokeWidth = strokeWidth;
    }
}

public class PathShape : Shape
{
    public string Data { get; private set; }
    private List<(double x, double y)> Points { get; set; } = new();
    private readonly StringBuilder _pathBuilder = new();

    public PathShape(string color, int strokeWidth) : base(color, strokeWidth)
    {
        Data = "";
    }

    public void StartAt(double x, double y)
    {
        Points.Clear();
        Points.Add((x, y));
        _pathBuilder.Clear();
        _pathBuilder.Append($"M {x} {y}");
        Data = _pathBuilder.ToString();
    }

    public void LineTo(double x, double y)
    {
        Points.Add((x, y));
        _pathBuilder.Append($" L {x} {y}");
        Data = _pathBuilder.ToString();
    }
}

public class LineShape : Shape
{
    public double X1 { get; set; }
    public double Y1 { get; set; }
    public double X2 { get; set; }
    public double Y2 { get; set; }

    public LineShape(double x1, double y1, string color, int strokeWidth) : base(color, strokeWidth)
    {
        X1 = x1;
        Y1 = y1;
        X2 = x1;
        Y2 = y1;
    }

    public void UpdateEndPoint(double x2, double y2)
    {
        X2 = x2;
        Y2 = y2;
    }
}

public class RectangleShape : Shape
{
    public double X { get; set; }
    public double Y { get; set; }
    public double Width { get; set; }
    public double Height { get; set; }

    public RectangleShape(double x, double y, string color, int strokeWidth) : base(color, strokeWidth)
    {
        X = x;
        Y = y;
    }

    public void UpdateSize(double x2, double y2)
    {
        if (x2 < X)
        {
            Width = X - x2;
            X = x2;
        }
        else
        {
            Width = x2 - X;
        }

        if (y2 < Y)
        {
            Height = Y - y2;
            Y = y2;
        }
        else
        {
            Height = y2 - Y;
        }
    }
}

public class CircleShape : Shape
{
    public double CX { get; set; }
    public double CY { get; set; }
    public double Radius { get; set; }

    public CircleShape(double cx, double cy, string color, int strokeWidth) : base(color, strokeWidth)
    {
        CX = cx;
        CY = cy;
    }

    public void UpdateRadius(double x2, double y2)
    {
        double dx = x2 - CX;
        double dy = y2 - CY;
        Radius = Math.Sqrt(dx * dx + dy * dy);
    }
}