/* ZTL Check — tool shell.
   Reads window.ZTL_RULES. Don't put logic here; put it in rules.js. */

(function () {
  var R = window.ZTL_RULES;
  if (!R || !document.getElementById('tool')) return;

  var A = {};
  var days = function (a, b) { return Math.round((b - a) / 864e5); };

  function evaluate() {
    if (A.doc_type === 'rental_fee') return { out: 'not_a_fine' };
    if (A.doc_type === 'preavviso')  return { out: 'preavviso' };

    var since = days(new Date(A.notice_date), new Date());
    var left  = R.timing.appeal_days - since;

    if (since > R.timing.appeal_days) return { out: 'expired', left: 0 };

    if (A.violation_date &&
        days(new Date(A.violation_date), new Date(A.notice_date)) > R.timing.late_notice_days) {
      return { out: 'appeal_strong', ground: 'notified_late', left: left };
    }

    var cell = R.matrix[A.entry + '|' + A.mismatch];
    if (cell.o === 'no_ground' && since <= R.timing.discount_days) {
      return { out: 'pay_discount', left: R.timing.discount_days - since };
    }
    return { out: cell.o, ground: cell.g, left: left };
  }

  function show(id, i) {
    var steps = document.querySelectorAll('#tool .step');
    for (var k = 0; k < steps.length; k++) steps[k].classList.remove('on');
    document.getElementById(id).classList.add('on');
    var dots = document.querySelectorAll('#tool .dot');
    for (var j = 0; j < dots.length; j++) dots[j].classList.toggle('on', j < i);
    document.getElementById('tool').scrollIntoView({ block: 'start' });
  }

  function result() {
    var r = evaluate(), o = R.outcomes[r.out];

    document.getElementById('badge').className = 'sign-badge ' + o.s;
    document.getElementById('bnum').textContent = (r.left === undefined || r.left === null) ? '—' : r.left;
    document.getElementById('bunit').innerHTML =
      (r.left === undefined || r.left === null) ? 'no&nbsp;deadline'
      : r.out === 'pay_discount' ? 'days of<br>discount left'
      : 'days left<br>to appeal';

    document.getElementById('verdict').textContent = o.h;
    document.getElementById('detail').textContent  = o.d;

    var g = document.getElementById('ground');
    if (r.ground) { g.hidden = false; g.innerHTML = '<b>Your ground:</b> ' + R.grounds[r.ground]; }
    else { g.hidden = true; }

    var c = document.getElementById('cta');
    c.className = 'btn block ' + (o.c === 'act' ? 'primary' : 'ghost');
    c.textContent = o.cl;
    c.setAttribute('href', o.href || '#');

    show('sr', 4);
  }

  var opts = document.querySelectorAll('#tool .opt');
  for (var i = 0; i < opts.length; i++) {
    opts[i].addEventListener('click', function () {
      A[this.dataset.q] = this.dataset.v;
      if (this.dataset.q === 'doc_type') {
        if (this.dataset.v === 'verbale') show('s2', 2); else result();
      } else if (this.dataset.q === 'entry') {
        show('s4', 4);
      } else if (this.dataset.q === 'mismatch') {
        result();
      }
    });
  }

  var nd = document.getElementById('notice_date');
  nd.addEventListener('input', function () {
    document.getElementById('n2').disabled = !nd.value;
  });
  document.getElementById('n2').addEventListener('click', function () {
    A.notice_date = nd.value;
    A.violation_date = document.getElementById('violation_date').value || null;
    show('s3', 3);
  });

  var backs = document.querySelectorAll('#tool [data-back]');
  for (var b = 0; b < backs.length; b++) {
    backs[b].addEventListener('click', function () {
      show('s' + this.dataset.back, parseInt(this.dataset.back, 10));
    });
  }
})();
