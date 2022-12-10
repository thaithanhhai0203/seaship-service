import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PythonShell, Options } from 'python-shell';
import { VrpDto } from 'src/controllers/dto/vrp.dto';

@Injectable()
export class PythonService {
  getVehicleRouting(vrpDto: VrpDto, res) {
    const options: Options = {
      mode: 'json',
      // pythonPath:
      //   'C:/Users/User/AppData/Local/Programs/Python/Python39/python.exe',
      pythonPath:
        'C:/Users/Admin/AppData/Local/Programs/Python/Python39/python.exe',
      scriptPath: './src/scripts',
      pythonOptions: ['-u'],
      args: [
        JSON.stringify(vrpDto.coordinates),
        JSON.stringify(vrpDto.num_vehicles),
        JSON.stringify(vrpDto.depot),
        JSON.stringify(vrpDto.weight),
        JSON.stringify(vrpDto.vehicle_weight),
        JSON.stringify(vrpDto.dimension),
        JSON.stringify(vrpDto.vehicle_dimension),
        JSON.stringify(vrpDto.max_travel),
      ],
    };

    PythonShell.run('cvrp.py', options, function (err, schedule) {
      if (err) throw new InternalServerErrorException(err);
      res.json(schedule[0]);
    });
  }
}
