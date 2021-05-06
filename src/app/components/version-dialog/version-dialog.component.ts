import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetVersionComparisonOutput } from 'src/core/application/services/get-version-comparison.service';

interface VersionDialogInput {
  title: string;
  diffData: GetVersionComparisonOutput;
}

@Component({
  selector: 'app-version-dialog',
  templateUrl: './version-dialog.component.html',
  styleUrls: ['./version-dialog.component.scss']
})
export class VersionDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: VersionDialogInput
  ) { }

  ngOnInit(): void {
  }

  copy(text?: string): void {
    if (!text) {
      return;
    }
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}
