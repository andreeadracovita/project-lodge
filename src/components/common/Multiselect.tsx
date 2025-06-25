import classNames from "classnames";
import { useState } from "react";

import { capitalizeFirstLetter } from "/src/utils/StringUtils";

/**
 * Options are an array of objects with id and name: [ {id, name}, {id, name}, ...];
 * Examples: Features, Experiences
 */
export default function Multiselect({ options, selectedIds, handleChange, isEditable, iconMap }) {

	function isIdSelected(id) {
		if (!selectedIds) {
			return false;
		}
		return selectedIds.includes(id);
	}
	
	return (
		<>
		{
			selectedIds && options &&
			<>
				<div id="selected" className="d-flex flex-wrap">
				{
					selectedIds.map((id) => {
						const found = options.find(opt => opt.id == id);
						if (found) {
							return <span
								key={found.id}
								id={found.id}
								className={classNames(
									"features-list-item",
									{
										"selectable-item": isEditable,
										"selected-feature": isEditable && isIdSelected(found.id)
									}
								)}
								onClick={isEditable ? handleChange : undefined}
							>
								{ iconMap && iconMap.get(found.name) } { capitalizeFirstLetter(found.name) }
							</span>
						}
					})	
				}
				</div>
				{
					isEditable &&
					<div id="unselected" className="d-flex flex-wrap">
						{
							options && options.map(opt => 
								<span
									key={opt.id}
									id={opt.id}
									className={classNames(
										"features-list-item",
										"selectable-item",
										{
											"d-none": isIdSelected(opt.id)
										}
									)}
									onClick={handleChange}
								>
									{ iconMap && iconMap.get(opt.name) } { capitalizeFirstLetter(opt.name) }
								</span>
							)	
						}
					</div>
				}
			</>
		}
		</>
	);
}