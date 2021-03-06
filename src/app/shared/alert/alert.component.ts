import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
    @Input() message: string;

    @Output() closeWindow = new EventEmitter<void>();

    onClose() {
        this.closeWindow.emit();
    }
}