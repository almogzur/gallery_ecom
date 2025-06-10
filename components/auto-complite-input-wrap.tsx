import { Autocomplete, MenuItem, SxProps, TextField } from "@mui/material";
import ControledLabel from '@/components/mui-input-wrap/controled-form-label'
import ControledHelperText from '@/components/mui-input-wrap/controled-helper-text'
import { InputWrapPropsType } from '@/components/mui-input-wrap/input-wrap'


interface AutoCompliteInputWrapPropsType extends Omit<InputWrapPropsType, 'multiline'> {

  AutocompleteOptionArray: string[]
  textFiledSxProps?:SxProps
  controledLabelSxcProps?:SxProps
}

export default function AutoCompliteInputWrap({
  AutocompleteOptionArray,
  inputType,
  label,
  value,
  onChangeHndler,
  isRequired,
  stateName,
  variant,
  Fgrow,
  bg,
  m,
  helpText,
  helpTextPotionsEnd,
  isDisabled,
  hoverColor,
  labelPositioin,
  sxProps,
  textFiledSxProps,
  controledLabelSxcProps

}: AutoCompliteInputWrapPropsType) {
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
          type={inputType} //defult to text
          value={value ?? ""}
          onChange={onChangeHndler}
          required={isRequired}
          disabled={isDisabled}
          name={stateName}
          helperText={helpText && <ControledHelperText text={helpText} helpTextPotionsEnd={helpTextPotionsEnd ?? false} />}
          variant={variant ?? 'standard'}
          label={
          <ControledLabel 
          labelPositioin={labelPositioin} 
          label={label}
          sxProps={controledLabelSxcProps}
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