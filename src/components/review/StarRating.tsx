import "./StarRating.css";

type StarRatingProps = {
	value: number,
	handleChange: any
}

export default function StarRating({ value, handleChange }: StarRatingProps) {
	
	return (
		<div className="rating">
			<input
				type="radio"
				id="star5"
				name="rating"
				value={5}
				checked={value === 5}
				onChange={handleChange}
			/>
			<label htmlFor="star5" title="5 stars">★</label>

			<input
				type="radio"
				id="star4"
				name="rating"
				value={4}
				checked={value === 4}
				onChange={handleChange}
			/>
			<label htmlFor="star4" title="4 stars">★</label>

			<input
				type="radio"
				id="star3"
				name="rating"
				value={3}
				checked={value === 3}
				onChange={handleChange}
			/>
			<label htmlFor="star3" title="3 stars">★</label>

			<input
				type="radio"
				id="star2"
				name="rating"
				value={2}
				checked={value === 2}
				onChange={handleChange}
			/>
			<label htmlFor="star2" title="2 stars">★</label>

			<input
				type="radio"
				id="star1"
				name="rating"
				value={1}
				checked={value === 1}
				onChange={handleChange}
			/>
			<label htmlFor="star1" title="1 star">★</label>
		</div>
	);
}