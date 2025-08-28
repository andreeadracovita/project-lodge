import classNames from "classnames";

import { capitalizeFirstLetter } from "utils/stringUtils";

type MultiselectProps = {
	options: string[],
	selectedIds: number[],
	handleChange: any,
	isEditable: boolean,
	iconMap?: any
};

/**
 * Options are an array of objects with id and name: [ {id, name}, {id, name}, ...];
 * Examples: Features, Experiences
 */
export default function Multiselect({ options, selectedIds, handleChange, isEditable, iconMap }: MultiselectProps) {

	function isIdSelected(id: number): boolean {
		if (!selectedIds) {
			return false;
		}
		return selectedIds.includes(id);
	}
	
	return (
		<div id="multiselect">
		{
			selectedIds && options &&
			<>
				<div id="selected" className="d-flex flex-wrap">
				{
					selectedIds.map((id: number) => {
						const found: any = options.find((opt: any) => opt.id == id);
						if (found) {
							return <div
								key={found.id}
								id={found.id}
								className={classNames(
									"features-list-item",
									"d-flex",
									"align-items-center",
									{
										"selectable-item": isEditable,
										"selected-feature": isEditable && isIdSelected(found.id)
									}
								)}
								onClick={isEditable ? handleChange : undefined}
							>
								{ iconMap && iconMap.get(found.name) }
								<span className="ms-1 bubble-click">{ capitalizeFirstLetter(found.name) }</span>
							</div>
						}
					})
				}
				</div>
				{
					isEditable &&
					<div id="unselected" className="d-flex flex-wrap">
						{
							options && options.map((opt: any) => 
								<div
									key={opt.id}
									id={opt.id}
									className={classNames(
										"features-list-item",
										"selectable-item",
										"d-flex",
										"align-items-center",
										{
											"d-none": isIdSelected(opt.id)
										}
									)}
									onClick={handleChange}
								>
									{ iconMap && iconMap.get(opt.name) }
									<span className="ms-1 bubble-click">{ capitalizeFirstLetter(opt.name) }</span>
								</div>
							)
						}
					</div>
				}
			</>
		}
		</div>
	);
}