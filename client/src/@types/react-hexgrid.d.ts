declare module 'react-hexgrid' {
	class Hexagon extends React.Component<HexagonProps & any, any> {}

	interface HexagonProps {
		q: number;
		r: number;
		s: number;
		fill?: string;
		cellStyle?: React.CSSProperties;
		className?: string;
		data?: Record<string, unknown>;
		onMouseEnter?: React.MouseEventHandler<T>;
		onMouseOver?: React.MouseEventHandler<T>;
		onMouseLeave?: React.MouseEventHandler<T>;
		onClick?: React.MouseEventHandler<T>;
		onDragStart?: React.DragEventHandler<T>;
		onDragEnd?: React.DragEventHandler<T>;
		onDragOver?: React.DragEventHandler<T>;
		onDrop?: React.DragEventHandler<T>;
		children?: React.ReactNode;
	}

	class Text extends React.Component<TextProps & any, any> {}

	interface TextProps {
		children?: string;
		x?: string | number;
		y?: string | number;
		className?: string;
	}

	class Point {
		constructor(x: number, y: number);

		readonly x: number;
		readonly y: number;
	}

	class Hex {
		constructor(q: number, r: number, s: number);

		readonly q: number;
		readonly r: number;
		readonly s: number;
	}

	class Orientation {
		constructor(
			f0: number,
			f1: number,
			f2: number,
			f3: number,
			b0: number,
			b1: number,
			b2: number,
			b3: number,
			startAngle: number
		);

		readonly f0: number;
		readonly f1: number;
		readonly f2: number;
		readonly f3: number;
		readonly b0: number;
		readonly b1: number;
		readonly b2: number;
		readonly b3: number;
		readonly startAngle: number;
	}

	class GridGenerator {
		static getGenerator(name: string): function;
		static ring(center: number, mapRadius: number): Hex[];
		static spiral(center: number, mapRadius: number): Hex[];
		static parallelogram(q1: number, q2: number, r1: number, r2: number): Hex[];
		static triangle(mapSize: number): Hex[];
		static hexagon(mapRadius: number): Hex[];
		static rectangle(mapWidth: number, mapHeight: number): Hex[];
		static orientedRectangle(mapWidth: number, mapHeight: number): Hex[];
	}

	class HexGrid extends React.Component<HexGridProps & any, any> {}

	interface HexGridProps {
		width: string | number;
		height: string | number;
		viewBox?: string;
		children: React.ReactNode;
	}

	class Layout extends React.Component<LayoutProps & any, any> {}

	interface LayoutProps {
		children: React.ReactNode;
		className?: string;
		flat?: boolean;
		origin?: Point;
		size?: Point;
		spacing?: number;
	}
}
