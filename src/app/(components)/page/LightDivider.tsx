export const LightDivider = ({
  spacing = '16px 0',
  thickness = '1px',
  color = '#e0e0e0',
}) => {
  return (
    <hr
      style={{
        height: thickness,
        backgroundColor: color,
        margin: spacing,
        border: 'none',
      }}
    />
  );
};
