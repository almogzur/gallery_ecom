import { Autocomplete, MenuItem, SxProps, TextField } from "@mui/material";
import ControlledLabel from '@/components/mui-input-wrap/controlled-form-label'
import ControlledHelperText from '@/components/mui-input-wrap/controlled-form-label'
import { InputWrapPropsType } from '@/components/mui-input-wrap/input-wrap'


interface AutoCompleteInputWrapPropsType extends Omit<InputWrapPropsType, 'multiline'> {

  AutocompleteOptionArray: string[]
  textFiledSxProps?:SxProps
  controlledLabelSxcProps?:SxProps
}

export default function AutoCompleteInputWrap({
  AutocompleteOptionArray,
  inputType,
  label,
  value,
  onChangeHandler,
  isRequired,
  stateName,
  variant,
  Fgrow,
  bg,
  m,
  helpText,
  isDisabled,
  hoverColor,
  labelPosition,
  sxProps,
  textFiledSxProps,
  controlledLabelSxcProps

}: AutoCompleteInputWrapPropsType) {
  return (
    <Autocomplete
      slotProps={{ listbox: {}  }}
      options={AutocompleteOptionArray ?? []}
      sx={{
        flexGrow: Fgrow ?? null,
        bgcolor: bg,
        m: m ? m : 0.5,
        ...sxProps,
        '&:hover': {
          backgroundColor: hoverColor,
        },
      }}
    

      autoHighlight
      clearOnEscape
      disableClearable
      openOnFocus
      renderInput={(params) =>
        <TextField
          {...params}
          sx={{
            flexGrow: Fgrow ?? null,
            bgcolor: bg,
              borderRadius:10,
              ...textFiledSxProps,
            '&:hover': {
              backgroundColor: hoverColor,
              
            },
          }}
          id={label}
          type={inputType} //default to text
          value={value ?? ""}
          onChange={onChangeHandler}
          required={isRequired}
          disabled={isDisabled}
          name={stateName}
          helperText={helpText && <ControlledHelperText label={helpText} labelPosition={"top"}  />}
          variant={variant ?? 'standard'}
          label={
          <ControlledLabel 
          labelPosition={labelPosition} 
          label={label}
          sxProps={controlledLabelSxcProps}
          isLabelBold

           />}

        />
      }
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;

        return (
          <MenuItem
            key={key}
            {...optionProps}
         
            style={{ width: "100%", direction: "rtl" }}
          >
            {option}
          </MenuItem>
        );
      }}
    />
  )
}