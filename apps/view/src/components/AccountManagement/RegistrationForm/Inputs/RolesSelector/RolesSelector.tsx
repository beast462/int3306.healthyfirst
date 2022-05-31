import { useRoles } from '@/view/hooks/useRoles';
import { useUser } from '@/view/hooks/useUser';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface IProps {
  className: string;
}

function RolesSelector({ className }: IProps) {
  const { roles } = useRoles();
  const { user } = useUser();

  return (
    <FormControl className={className} size="small" fullWidth>
      <InputLabel>Vai trò</InputLabel>

      <Select label="Vai trò" name="roleId" defaultValue={1}>
        {(roles ?? []).map((role) => {
          const disabled = user.role.level >= role.level;

          return (
            <MenuItem
              key={`role#${role.id}`}
              disabled={disabled}
              value={role.id}
            >
              {role.description}
              {disabled && ' (Không đủ quyền tạo)'}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default RolesSelector;
