// ** MUI Imports
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

// ** Icons Imports

interface TableHeaderProps {
  value: string;
  handleFilter: (val: string) => void;
  handleDeleteAllUsers: () => void;
  data: any;
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleFilter, value, handleDeleteAllUsers } = props;

  // const exportData = () => {
  //   const data = props.data;

  //   const fileName = 'users.json';
  //   const json = JSON.stringify(data);
  //   const blob = new Blob([json], { type: 'application/json' });
  //   const href = URL.createObjectURL(blob);

  //   const link = document.createElement('a');
  //   link.href = href;
  //   link.download = fileName;
  //   document.body.appendChild(link);
  //   link.click();

  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(href);
  // };

  const exportData = () => {
    const data = props.data;

    const json = JSON.stringify(data);

    const blob = new Blob([json], { type: 'application/json' });
    const href = URL.createObjectURL(blob);

    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TextField
        size="small"
        value={value}
        sx={{ mr: 4, mb: 2 }}
        placeholder="Buscar Usuário"
        onChange={(e) => handleFilter(e.target.value)}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
        <Button sx={{ mb: 2 }} variant="contained" onClick={exportData}>
          Exportar Dados
        </Button>

        <Button sx={{ mb: 2 }} color="error" variant="contained" onClick={handleDeleteAllUsers}>
          Excluir Todos os Usuários
        </Button>
      </Box>
    </Box>
  );
};

export default TableHeader;
