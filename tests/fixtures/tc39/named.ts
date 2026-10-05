declare let dec: any;


{ let x = @dec class { }; }
{ let x = class { @dec y: any; }; }

{ const x = @dec class { }; }
{ const x = class { @dec y: any; }; }


{ var x2 = @dec class { }; }
{ var x1 = class { @dec y: any; }; }
