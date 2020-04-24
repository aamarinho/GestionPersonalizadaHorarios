import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit, AfterViewInit, ElementRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours, addMinutes,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {CalendarioService} from '../../services/calendario.service';
import {start} from 'repl';
import * as $ from 'jquery';

const colors: any = { //colores para los eventos del calendario
  0: {
    primary: '#76954a',
  },
  1: {
    primary: '#54f6e3',
  },
  2: {
    primary: '#e3bc08',
  },
  3: {
    primary: '#846be3',
  },
  4: {
    primary: '#ff9fcd',
  },
  5: {
    primary: '#68e300',
  },
  6: {
    primary: '#e36100',
  },
  7: {
    primary: '#49e388',
  },
  8: {
    primary: '#e3002d',
  },
  9: {
    primary: '#1100e3',
  },
  10: {
    primary: '#fd299d',
  },
};
@Component({
  selector: 'app-calendario',
  styleUrls: ['./calendario.component.css'],
  templateUrl: './calendario.component.html',
})
export class CalendarioComponent implements OnInit{
  constructor(private modal: NgbModal, private calendarioService : CalendarioService) {}

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('hoy',{ static:true }) hoy: ElementRef<HTMLElement>;


  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
  ];

  activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit() {
    this.calendarioService.getCalendario(window.sessionStorage.getItem('calendariousuario')).subscribe(
      result => {
        let asignatura2:string='';
        let temp=0;
        let asignatura:string='';
        for (let e of result) {
          asignatura=e.id_asignatura;//asignatura actual

          let diaFecha = e.fecha.substr(8,2);//restamos un dia a la fecha del calendario porque los dias van desde 0 no desde 1
          diaFecha=diaFecha-1;
          let fechaSinDia=e.fecha.substr(0,8);
          fechaSinDia = fechaSinDia.replace(/-/g, ',');
          let fecha=fechaSinDia+diaFecha;

          let horai = e.hora_inicio.substr(0, 2);
          if (horai.charAt(0) == 0) {
            horai = horai.replace(/0/, '');
          }
          let minutosi = e.hora_inicio.substr(3, 2);
          if (minutosi.charAt(0) == 0) {
            minutosi = minutosi.replace(/0/, '');
          }
          let horaf = e.hora_fin.substr(0, 2);
          if (horaf.charAt(0) == 0) {
            horaf = horaf.replace(/0/, '');
          }
          let minutosf = e.hora_fin.substr(3, 2);
          if (minutosf.charAt(0) == 0) {
            minutosf = minutosf.replace(/0/, '');
          }
          console.log(colors[temp].primary);
          this.events = [
            ...this.events,
            {
              title: e.id_grupo+'[' + e.aula + ']'+'('+e.nombre+')',
              start: addMinutes(addHours(addDays(startOfDay(new Date(fecha)), 1), horai), minutosi),
              end: addMinutes(addHours(addDays(startOfDay(new Date(fecha)), 1), horaf), minutosf),
              color: colors[temp],
              draggable: true,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
            },
          ];
          if(asignatura!=asignatura2){
            if(temp==10){
              temp=0;
            } else{
              temp++;
            }
          }
          asignatura2=asignatura;
        }
      },
      error => {
        console.log(error);
        console.log("CALENDARIO EROOOOOOOOOOOOOOOOOOOR");
      });
  }


}
