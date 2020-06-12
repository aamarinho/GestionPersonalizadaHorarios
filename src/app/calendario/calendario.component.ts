import {
  Component,
  ViewChild,
  TemplateRef, OnInit, ElementRef,
} from '@angular/core';
import {
  startOfDay,
  addDays,
  isSameDay,
  isSameMonth,
  addHours, addMinutes,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {CalendarioService} from '../../services/calendario.service';

/**
 * array de colores para cada evento del calendario
 */
const colors: any = {
  0: {
    primary: '#FF637D',
    secondary: '#FF637D',
  },
  1: {
    primary: '#66D7D1',
    secondary: '#66D7D1',
  },
  2: {
    primary: '#FFF87F',
    secondary: '#FFF87F',
  },
  3: {
    primary: '#a7d6a0',
    secondary: '#a7d6a0',
  },
  4: {
    primary: '#ffb9e0',
    secondary: '#ff9fcd',
  },
  5: {
    primary: '#e3c09f',
    secondary: '#e3c09f',
  },
  6: {
    primary: '#009C8C',
    secondary: '#009C8C',
  },
  7: {
    primary: '#EFA94A',
    secondary: '#EFA94A',
  },
  8: {
    primary: '#FF6961',
    secondary: '#FF6961',
  },
  9: {
    primary: '#81D8D0',
    secondary: '#81D8D0',
  },
  10: {
    primary: '#86895D',
    secondary: '#86895D',
  },
};
@Component({
  selector: 'app-calendario',
  styleUrls: ['./calendario.component.css'],
  templateUrl: './calendario.component.html',
})
export class CalendarioComponent implements OnInit{

  /**
   * constructor usado para instanciar objetos de esta clase a partir de un objeto NgbModal y un objeto CalendarioService
   * @param modal
   * @param calendarioService
   */
  constructor(private modal: NgbModal, private calendarioService : CalendarioService) {}

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('hoy',{ static:true }) hoy: ElementRef<HTMLElement>;

  /**
   * dias que se van a excluir en el calendario
   */
  excludeDays: number[] = [0, 6];
  /**
   * objeto de la clase CalendarView en este caso referido al mes
   */
  view: CalendarView = CalendarView.Month;
  /**
   * objeto de la clase CalendarView utilizado para acceder a todos los nombres de mes año o dia
   */
  CalendarView = CalendarView;
  /**
   * objeto tipo Date usado para el formato de los dias
   */
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  refresh: Subject<any> = new Subject();
  /**
   * array donde se van a almacenar todos los eventos recuperados
   */
  events: CalendarEvent[] = [];
  /**
   * booleano para mostrar debajo del día clickado una vista detallada del evento
   */
  activeDayIsOpen: boolean = false;

  /**
   * método para abrir o cerrar la vista detallada debajo del día clickado
   * @param date
   * @param events
   */
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

  /**
   * método usado cuando se desplaza un evento en el calendario
   * @param event
   * @param newStart
   * @param newEnd
   */
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

  /**
   * método usado para abrir el modal del evento que se clicka
   * @param action
   * @param event
   */
  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  /**
   * método usado para cambiar el modo del calendario: mensual, semanal o diario
   * @param view
   */
  setView(view: CalendarView) {
    this.view = view;
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  /**
   * primer método que se ejecuta al cargar la vista para rellenar el array de eventos de todos los eventos
   * recuperados para un usuario del sistema almacenado en el sessionStorage
   */
  ngOnInit() {
    this.calendarioService.getCalendario(window.sessionStorage.getItem('calendariousuario')).subscribe(
      result => {
        let asignatura2:string='';
        let temp=-1;
        let asignatura:string='';
        for (let e of result) {
          asignatura=e.id_asignatura;//asignatura actual

          let diaFecha = e.fecha.substr(8,2);//restamos un dia a la fecha del calendario porque los dias van desde 0 no desde 1
          diaFecha=diaFecha-1;
          let mesFecha=e.fecha.substr(5,2);
          mesFecha=mesFecha-1;
          let anoFecha=e.fecha.substr(0,4);

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
          if(asignatura!=asignatura2){ //para cambiar el color de los eventos cuando se cambia de asignatura
            if(temp==10){
              temp=0;
            } else{
              temp++;
            }
          }
          asignatura2=asignatura;
          this.events = [
            ...this.events,
            {
              title: e.id_grupo+' [' + e.aula + ']'+' ('+e.nombre+')',
              start: addMinutes(addHours(addDays(startOfDay(new Date(anoFecha,mesFecha,diaFecha)), 1), horai), minutosi),
              end: addMinutes(addHours(addDays(startOfDay(new Date(anoFecha,mesFecha,diaFecha)), 1), horaf), minutosf),
              color: colors[temp],
              draggable: false,
              resizable: {
                beforeStart: false,
                afterEnd: false,
              },
            },
          ];
        }
      },
      error => {
        console.log(error);
      });
  }


}
