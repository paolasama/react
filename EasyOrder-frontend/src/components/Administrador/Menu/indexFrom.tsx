import { useState } from "react";
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel } from "@mui/material";

interface Menu {
  id: number;
  name: string;
  branch: string;
  active: boolean;
}

interface IndexFromProps {
  onAddMenu: (menu: Menu) => void;
}

export default function IndexFrom({ onAddMenu }: IndexFromProps) {
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [active, setActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !branch.trim()) return;

    const newMenu: Menu = {
      id: Date.now(),
      name,
      branch,
      active,
    };

    onAddMenu(newMenu);
    setName("");
    setBranch("");
    setActive(true);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
      <TextField label="Nombre del Menú *" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />
      
      <FormControl fullWidth>
        <InputLabel>Seleccione una sucursal</InputLabel>
        <Select value={branch} onChange={(e) => setBranch(e.target.value)}>
          <MenuItem value="Sucursal A">Sucursal A</MenuItem>
          <MenuItem value="Sucursal B">Sucursal B</MenuItem>
          <MenuItem value="Sucursal C">Sucursal C</MenuItem>
        </Select>
      </FormControl>

      <FormControlLabel control={<Switch checked={active} onChange={(e) => setActive(e.target.checked)} />} label="Activo" />

      <Button variant="contained" type="submit" fullWidth>
        REGISTRAR MENÚ
      </Button>
    </Box>
  );
}
