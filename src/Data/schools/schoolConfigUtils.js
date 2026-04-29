export const applySchoolOverrides = (sections, overrides = {}) =>
  sections.map((section) => {
    const override = overrides[section.componentName];
    if (!override) return section;
    if (typeof override === "function") return override(section);
    return {
      ...section,
      ...override,
      props: override.props ?? section.props,
    };
  });
