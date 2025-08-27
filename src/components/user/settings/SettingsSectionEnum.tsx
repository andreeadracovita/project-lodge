export const SettingsSectionEnum = {
	None: "None",
	Avatar: "Avatar",
	Name: "Name",
	Email: "Email",
	Nationality: "Nationality",
	Password: "Password",
	Currency: "Currency",
	Language: "Language",
	Experiences: "Experiences"
} as const;
export type SettingsSectionEnum = (typeof SettingsSectionEnum)[keyof typeof SettingsSectionEnum];